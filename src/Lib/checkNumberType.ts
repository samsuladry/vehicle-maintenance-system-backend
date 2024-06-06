const checkNumber = (input: any) => {

    if (isNaN(Number(input))) {
        return true
    } else {
        return false
    }
}

export default checkNumber