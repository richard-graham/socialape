const isEmpty = (string) => {
  if (string.trim() === '') return true
  else return false 
}

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(email.match(regEx)){
    return true
  } else {
    return false
  }
}

exports.validateSignUpData = (data) => {
  let errors = {}

  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address'
  }

  if (isEmpty(data.password)) errors.password = 'Must not be empty'
  if (isEmpty(data.confirmPassword)) errors.confirmPassword = 'Must not be empty'
  if (data.password !== data.confirmPassword || data.password.length !== data.confirmPassword.length) errors.confirmPassword = 'Passwords must match'
  if (isEmpty(data.handle)) errors.handle = 'Must not be empty'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.validateLoginData = (data) => {
  let errors = {}

  if(isEmpty(data.email)) errors.email = 'Must not be empty'
  if(isEmpty(data.password)) errors.password = 'Must not be empty'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.reduceUserDetails = (data) => {
  let userDetails = {}

  // makes sure we don't submit empty strings overwriting prev user data

  if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio
  if(!isEmpty(data.location.trim())) userDetails.location = data.location
  if(!isEmpty(data.website.trim())){
    // validate if user enters www.test.com as opposed to http://www.test.com
    if(data.website.trim().substring(0, 4) !== 'http'){
      userDetails.website = `http://${data.website.trim()}`
    } else userDetails.website = data.website
  }

  return userDetails
}