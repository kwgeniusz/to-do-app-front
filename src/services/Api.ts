// src/services/Api.ts
export class Api {
  static baseUrl = "http://127.0.0.1:8000/api";

  static getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  static async get<T>(url: string): Promise<any> {
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "GET",
      headers: Api.getAuthHeaders(),
    });
    const dataResponse = await response.json();
    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }

  static async post<T>(url: string, data: any): Promise<any> {
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "POST",
      headers: Api.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const dataResponse = await response.json();
    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }

  static async put<T>(url: string, data: any): Promise<any> {
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "PUT",
      headers: Api.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const dataResponse = await response.json();
    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }

  static async delete<T>(url: string): Promise<any> {
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "DELETE",
      headers: Api.getAuthHeaders(),
    });

    // Si el código de estado es 204, no proceses el cuerpo
    if (response.status === 204) {
      return {
        statusCode: response.status,
        data: null, // No hay contenido en la respuesta
      };
    }

    // Para otros códigos de estado, procesamos la respuesta como JSON
    const dataResponse = await response.json();

    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }

}
