// Assuming utils.SocialLinks translates to a TypeScript interface like this
export interface SocialLinks {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
}

export function decodeBase64SocialLinks(base64String: string): SocialLinks {
    const decodedString = atob(base64String);
    return JSON.parse(decodedString);
}
