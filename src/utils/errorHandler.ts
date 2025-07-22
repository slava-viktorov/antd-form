import { message } from 'antd';

export interface ErrorHandlerOptions {
  showMessage?: boolean;
  logError?: boolean;
  defaultMessage?: string;
  errorType?: unknown;
  rethrow?: boolean;
}

// Централизованная обработка ошибок
export default class ErrorHandler {
  // Обрабатывает ошибку с опциональным показом сообщения
  static handle(
    error: Error | unknown,
    options: ErrorHandlerOptions = {}
  ): void {
    const {
      showMessage = true,
      logError = true,
      defaultMessage = 'Произошла ошибка',
      rethrow = false,
    } = options;

    if (logError) {
      console.error('Error:', error);
    }

    if (showMessage) {
      const errorMessage =
        error instanceof Error ? error.message : defaultMessage;
      message.error(errorMessage);
    }

    if (rethrow) {
      if (error instanceof Error) throw error;
      throw new Error(defaultMessage);
    }
  }
}
