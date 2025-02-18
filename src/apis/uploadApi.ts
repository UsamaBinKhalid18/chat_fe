import { api } from 'src/apis/api.ts';
import { endpoints } from 'src/apis/endpoints.ts';
import { FileUpload } from 'src/components/Input';

export const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation<FileUpload, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: endpoints.UPLOAD,
          method: 'POST',
          body: formData,
        };
      },
    }),
    deleteFile: builder.mutation({
      query: (id) => ({
        url: endpoints.UPLOAD,
        method: 'DELETE',
        body: { id },
      }),
    }),
  }),
});

export const { useUploadMutation, useDeleteFileMutation } = uploadApi;
