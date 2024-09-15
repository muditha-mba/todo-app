interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export default function simulateApiCall<T>(
  sendingData: T
): Promise<ApiResponse<T>> {
  const responseData: ApiResponse<T> = {
    success: true,
    data: sendingData,
  };

  return new Promise<ApiResponse<T>>((resolve) => {
    setTimeout(() => {
      resolve(responseData);
    }, 2000);
  });
}
