import {appwriteConfig} from "@/lib/appwrite";

export const getImagePreviewUrl = (fileId: string, width = 400, height = 400) => {
    return `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${fileId}/preview?project=${appwriteConfig.projectId}&width=${width}&height=${height}&gravity=center&quality=80`;
};

export const getImageViewUrl = (fileId: string) => {
    return `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${fileId}/view?project=${appwriteConfig.projectId}`;
};