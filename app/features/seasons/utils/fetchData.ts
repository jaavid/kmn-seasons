import axios from '@/lib/axios';

export async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const { data } = await axios.get<T>(url);
    return data;
  } catch (e) {
    console.error('خطا در دریافت:', e);
    return null;
  }
}