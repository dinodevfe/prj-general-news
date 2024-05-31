// if (!process.env.API_URI) {
//   throw new Error('Invalid/Missing environment variable: "API_URI"')
// }

export class ServiceBase {
  private headers?: HeadersInit
  private baseUri: string
  constructor() {
    this.headers = { accept: 'application/json', 'content-type': 'application/json' }
    this.baseUri = process.env.API_URI ?? '/api'
  }

  protected GET = async (url: string) => {
    return fetch(`${this.baseUri}/${url}`, {
      method: 'GET',
      headers: this.headers,
    })
  }

  protected POST = async <T = any>(url: string, body: T) => {
    return fetch(`${this.baseUri}/${url}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }

  protected PATCH = async <T = any>(url: string, body: T) => {
    return fetch(`${this.baseUri}/${url}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }

  protected DELETE = async <T = any>(url: string, body: T) => {
    return fetch(`${this.baseUri}/${url}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }
}

export default ServiceBase
