declare global {
  export interface User {
    id: number
    fName: string
    lName: string
    age: number
  }

  export interface Config {
    environment: string
    server: {
      logLevel: string | 'debug'
      host: string
      port: string | number
      secret: string
      allowOrigins: string
    }
  }
}

export {}
