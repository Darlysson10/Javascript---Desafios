class ReadJsonError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ReadJsonError';
    }
  }
export default ReadJsonError;  