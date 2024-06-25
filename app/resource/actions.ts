import { GraphicUploadSchema } from '@/lib/validators';
import type { GraphicUploadForm } from '@/types';

export function uploadNewGraphics(
  prevState: GraphicUploadForm,
  formData: FormData,
): any {
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
}
