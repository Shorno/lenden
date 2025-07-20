import {Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
import {CreateUserPrams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.shorno.lenden",
    databaseId: "68728727000972a0bdcd",
    userCollectionId: "68728754001768a68363",
    memberCollectionId: "687aceb700253f12cde0",
    bucketId: "687be8250001612c4c3c",
}

export const client = new Client()

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform)

export const account = new Account(client)

export const databases = new Databases(client)

export const avatars = new Avatars(client)


export const storage = new Storage(client);


export const createUser = async ({email, password, name}: CreateUserPrams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if (!newAccount) throw Error;

        await signIn({email, password})

        const avatarUrl = avatars.getInitialsURL(name)

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {email, name, accountId: newAccount.$id, avatar: avatarUrl}
        )
    } catch (error) {
        throw new Error(error as string)
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        await account.createEmailPasswordSession(email, password)
    } catch (error) {
        throw new Error(error as string)
    }
}


export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
        return null
    }
}


export const logOut = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        throw new Error(error as string);
    }
}


export const addClient = async ({name, memberId, location, nidImageUri}: {
    name: string,
    memberId: string,
    location: string,
    nidImageUri: string
}) => {
    try {
        const fileName = `nid_${name}_${memberId}_${Date.now()}.jpg`;
        const uploadResult = await uploadImage(nidImageUri, fileName);

        const nidImageId = uploadResult.fileId;

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.memberCollectionId,
            ID.unique(),
            {name, memberId, location, nidImageId}
        )
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to add client');
    }
}

export const getClients = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error('No user found');

        return await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.memberCollectionId,
        );
    } catch (error) {
        throw new Error(error as string);
    }
}


export const uploadImage = async (imageUri: string, fileName: string) => {
    try {
        const file = {
            uri: imageUri,
            type: 'image/jpeg',
            name: fileName,
            size :0,
        };

        const response = await storage.createFile(
            appwriteConfig.bucketId,
            ID.unique(),
            file
        );

        console.log(response)

        const fileUrl = storage.getFileView(appwriteConfig.bucketId, response.$id);


        return {
            fileId: response.$id,
            fileUrl: fileUrl.toString()
        };
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to upload image');
    }
}

export const deleteImage = async (fileId: string) => {
    try {
        await storage.deleteFile(appwriteConfig.bucketId, fileId);
    } catch (error: any) {
        console.log('Error deleting image:', error?.message);
    }
}
