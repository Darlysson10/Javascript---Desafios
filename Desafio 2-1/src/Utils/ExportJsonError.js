class ExportJsonError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ExportJsonError';
    }
  }
export default ExportJsonError;