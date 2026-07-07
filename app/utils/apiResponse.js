
class ApiResponse {
    constructor(status,data, message="success") {
        this.status = status;
        this.message = message;
        this.data = data;
        this.success = status < 400
    }
}

export default ApiResponse;