if (!process.env.API_URI) {
  throw new Error('Invalid/Missing environment variable: "API_URI"')
}

export class ServiceBase {
  private headers?: HeadersInit
  constructor() {
    this.headers = { 'content-type': 'application/json' }
  }

  protected GET = async (url: string) => {
    return fetch(`${process.env.API_URI}/${url}`, {
      method: 'GET',
      headers: this.headers
    })
  }

  protected POST = async <T = any>(url: string, body: T) => {
    return fetch(`${process.env.API_URI}/${url}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }

  protected PATCH = async <T = any>(url: string, body: T) => {
    return fetch(`${process.env.API_URI}/${url}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }

  protected DELETE = async (url: string) => {
    return fetch(`${process.env.API_URI}/${url}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }
}

export default ServiceBase
