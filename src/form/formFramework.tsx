type TValue = {
  required?: boolean
}
type TQuestion = {
  errorMessage?: string
  label?: string
  touched?: boolean
  valid?: boolean
  validation?: TValue
  value?: string
}

type TFormControls = {
  question?: TQuestion
  option1?: TQuestion
  option2?: TQuestion
  option3?: TQuestion
  option4?: TQuestion
}


export const createControl = (config: any, validation: any) => {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
}


export const validate = (value: string, validation: TValue | null = null) => {
  if (!validation) {
    return true
  }
  let isValid = true
  
  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }
  return isValid
}

export const validateForm = (formControls: TFormControls): boolean => {
  let isFormValid = true
  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      // @ts-ignore
      isFormValid = formControls[control].valid && isFormValid
    }
  }
  return isFormValid
}