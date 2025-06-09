import { defineDocumentType, makeSource } from "contentlayer2/source-files";

interface RawDoc {
    flattenedPath: string;
}

interface Doc {
    _raw: RawDoc;
}

const computedFields = {
    slug: {
        type: "string" as const,
        resolve: (doc: Doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: "string" as const,
        resolve: (doc: Doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
};

export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: `posts/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: { type: "string", required: true },
        description: { type: "string", required: true },
        date: { type: "date", required: true },
        published: {
            type: "boolean",
            default: true,
        },
        image: { type: "string", required: false },
    },
    computedFields,
}));

export default makeSource({
    contentDirPath: "./content",
    documentTypes: [Post],
});
