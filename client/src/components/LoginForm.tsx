import { useEffect, useRef, useState } from "react"

export function LoginForm() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [validInputs, setValidInputs] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    //focus on input ending when toggling show password
    const CARET_END = 999
    if (passwordRef.current !== null) {
      passwordRef.current.focus()
      passwordRef.current.setSelectionRange(CARET_END, CARET_END)
    }
  }, [showPassword])

  useEffect(() => {
    //custom valid logic
    const validUser = user
    const validPassword = password
    //

    if (validUser && validPassword) {
      setValidInputs(true)
    } else {
      setValidInputs(false)
    }
  }, [user, password])

  const onUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setUser(input)
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setPassword(input)
  }

  const onToggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(user, password)
  }

  return (
    <div className="flex h-[400px] w-[800px] m-3 p-8 rounded-3xl bg-[#0000ff25] border-2 border-[#05011825]">
      <form
        className="flex flex-col gap-5 w-full max-w-xs mx-auto sm:mx-0"
        onSubmit={onSubmit}
      >
        <p className="font-medium border-white p-2 mx-auto border-t-2">
          Entrar no sistema
        </p>
        <div className="flex flex-col gap-6">
          <input
            className="h-10 w-full rounded-lg"
            type="text"
            onChange={onUserChange}
          />
          <input
            className="w-full rounded-lg"
            type={showPassword ? "text" : "password"}
            ref={passwordRef}
            onChange={onPasswordChange}
          />

          <div className="flex pt-2 justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="show-password"
                className={
                  "h-4 w-4 rounded-md border-[1px] border-white " +
                  (showPassword && "bg-cyan-500")
                }
                onClick={onToggleShowPassword}
              />
              <label className="text-sm text-white" htmlFor="show-password">
                Mostrar senha
              </label>
            </div>
          </div>
        </div>
        <input
          className="block h-10 w-3/4 mt-2 rounded-lg mx-auto border-2 border-white text-black bg-cyan-500 active:bg-white transition-colors
            disabled:rounded-2xl disabled:bg-[rgba(107,114,128,0.5)] disabled:text-gray-700 disabled:border-none"
          type="submit"
          value="Entrar"
          disabled={!validInputs}
        />
        <a
          className="text-xs text-gray-300 mx-auto hover:text-gray-200 underline"
          href=""
        >
          Não tem uma conta?
        </a>
      </form>
    </div>
  )
}
