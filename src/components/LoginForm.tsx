import { useState, type FormEvent } from 'react'
import { GreenApiError, getStateInstance } from '../api/greenApi'
import type { Credentials } from '../types'
import { getErrorMessage } from '../utils/error'
import { LogoIcon } from './icons'

const DEFAULT_API_URL = 'https://api.green-api.com'

interface LoginFormProps {
  onLogin: (creds: Credentials) => void
}

function describeLoginError(error: unknown): string {
  if (error instanceof GreenApiError && (error.status === 401 || error.status === 403)) {
    return 'Неверный idInstance или apiTokenInstance'
  }
  return `Не удалось подключиться: ${getErrorMessage(error)}`
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL)
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const creds: Credentials = {
      apiUrl: apiUrl.trim(),
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    }
    if (!creds.apiUrl || !creds.idInstance || !creds.apiTokenInstance) {
      setError('Заполните все поля')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const { stateInstance } = await getStateInstance(creds)
      if (stateInstance === 'authorized') {
        onLogin(creds)
        return
      }
      setError(`Инстанс не авторизован (состояние: ${stateInstance}). Авторизуйте его в консоли GREEN-API.`)
    } catch (err) {
      setError(describeLoginError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <form className="login__card" onSubmit={handleSubmit} noValidate>
        <div className="login__logo">
          <LogoIcon size={72} />
        </div>
        <h1 className="login__title">Войдите через GREEN-API</h1>
        <p className="login__hint">
          Укажите данные инстанса из{' '}
          <a className="login__link" href="https://console.green-api.com" target="_blank" rel="noreferrer">
            консоли GREEN-API
          </a>
        </p>

        <details className="login__disclosure">
          <summary className="login__disclosure-toggle">Где найти данные инстанса?</summary>
          <ol className="login__steps">
            <li className="login__step">
              Войдите в{' '}
              <a className="login__link" href="https://console.green-api.com" target="_blank" rel="noreferrer">
                консоль GREEN-API
              </a>
              .
            </li>
            <li className="login__step">Откройте инстанс — он должен быть авторизован в мессенджере.</li>
            <li className="login__step">Скопируйте idInstance и apiTokenInstance со страницы инстанса.</li>
          </ol>
        </details>

        <label className="login__field">
          <span className="login__label">id Instance</span>
          <input
            className="login__input"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="1101000001"
            inputMode="numeric"
          />
        </label>
        <label className="login__field">
          <span className="login__label">API Token Instance</span>
          <input
            className="login__input"
            type="password"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            placeholder="Токен инстанса"
            autoComplete="off"
          />
        </label>
        <details className="login__disclosure">
          <summary className="login__disclosure-toggle">Дополнительно</summary>
          <label className="login__field">
            <span className="login__label">apiUrl — адрес API из консоли, если отличается</span>
            <input className="login__input" type="url" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
          </label>
        </details>

        {error && (
          <div className="login__error" role="alert">
            {error}
          </div>
        )}
        <button type="submit" className="login__button" disabled={loading}>
          {loading ? 'Проверяем…' : 'Войти'}
        </button>

        <p className="login__powered">
          Работает на{' '}
          <a className="login__link" href="https://green-api.com" target="_blank" rel="noreferrer">
            GREEN-API
          </a>
        </p>
      </form>
    </div>
  )
}
