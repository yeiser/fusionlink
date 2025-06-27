export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  exception: string | null;
}