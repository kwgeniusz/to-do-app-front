export class Api {
  static baseUrl = "http://127.0.0.1:8000/api";

  static async get<T>(url: string): Promise<any> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const dataResponse = await response.json();

    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }

  static async post<T>(url: string, data: any): Promise<any> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json();

    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }

  static async put<T>(url: string, data: any): Promise<any> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json();

    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }

  static async delete<T>(url: string): Promise<any> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${Api.baseUrl}${url}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Manejo de respuestas vacías (como DELETE a menudo no tiene cuerpo)
    const dataResponse = response.status !== 204 ? await response.json() : null;

    return {
      statusCode: response.status,
      data: dataResponse,
    };
  }
}
