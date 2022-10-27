export function fResponse(response) {
    return { 'data': response?.data, 'status': response?.status, 'statusText': response?.statusText };
}