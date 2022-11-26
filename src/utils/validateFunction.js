const validateFunction = (target) => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (target === '' || target === null || target.length === 0) {
      return false;
    }

    if (target.type === 'url') {
      try {
        new URL(target.value);
        return true;
      } catch (_) {
        return false;
      }
    }

    if (target.type === 'email') {
      return EMAIL_REGEXP.test(target.value);
    }

    let minFlag = true,
      maxFlag = true;

    if (target.minLength > 0) {
      minFlag = target.value.length >= Number(target.minLength) ? true : false;
    }

    if (target.maxLength > 0) {
      maxFlag = target.value.length <= Number(target.maxLength) ? true : false;
    }

    return minFlag && maxFlag;
  };

  export default validateFunction;