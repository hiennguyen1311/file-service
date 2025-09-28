export async function uuid() {
  const { v4: uuidv4 } = await import('uuid');
  return uuidv4();
}
