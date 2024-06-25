import { GraphicUploadSchema } from '@/lib/validators';
import type { UploadNewGraphicsState } from '@/types';

export function uploadNewGraphics(
  prevState: UploadNewGraphicsState,
  formData: FormData,
) {
  const data = {
    category: formData.get('category'),
    name: formData.get('name'),
    file: formData.get('file'),
  };
  console.log(data);
  const result = GraphicUploadSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }
  return undefined;
}
