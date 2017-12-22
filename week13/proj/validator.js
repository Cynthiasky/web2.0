var validator = {
  form: {
    username: {
      status: false,
      errorMessage: '6~18 letters/numbers/_, must start with letters'
    },
    userid: {
      status: false,
      errorMessage: '8 numbers, cannot start with 0'
    },
    phone: {
      status: false,
      errorMessage: '11 numbers, cannot start with 0'
    },
    email: {
      status: false,
      errorMessage: 'xxx@xxx.xxx'
    }
  },
  isUsernameValid: function(username) {
    return this.form.username.status = /^[a-zA-Z][a-zA-z0-9_]{6,18}$/.test(username);
  },
  isUseridValid: function(userid) {
    return this.form.userid.status = /^[1-9]\d{7}$/.test(userid);
  },
  isPhoneValid: function(phone) {
    return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
  },
  isEmailValid: function(email) {
    return this.form.status = /^[a-zA-Z_\-]+@([a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/.test(email);
  },
  isFieldValid: function(fieldname, value) {
    var capname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
    return this["is"+capname+"Valid"](value);
  },
  isFormValid: function() {
    return this.form.username.status && this.form.userid.status && this.form.phone.status && this.form.email.status;
  },
  getErrorMessage: function(fieldname) {
    return this.form[fieldname].errorMessage;
  },
  isAttrValueUnique: function(registry, user, attr) {
    for(var key in registry) {
      if(registry.hasOwnProperty(key) && registry[key][attr] == user[attr]) return false;
    }
    return true;
  }
}

if(typeof module == 'object') {
  module.exports = validator;
}