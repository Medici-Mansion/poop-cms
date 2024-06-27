import { uploadGraphic } from '@/apis';
import { GraphicUploadSchema } from '@/lib/validators';
import type { UploadNewGraphicsState } from '@/types';

export async function uploadNewGraphics(
  prevState: UploadNewGraphicsState,
  formData: FormData,
) {
  const data = {
    category: formData.get('category'),
    name: formData.get('name'),
    file: formData.get('file'),
  };
  const result = GraphicUploadSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    try {
      const res = await uploadGraphic(formData);
      return res;
    } catch (error) {
      console.error('Upload failed: ', error);
      throw new Error('File upload failed');
    }
  }
  return undefined;
}
