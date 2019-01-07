const getFirstName = (fullname) =>{
    const nameArray = fullname.split(' ').filter(filterEmptyStrings);
    console.log(`Length of firstName from ${fullname} is ${nameArray.length}`);
    if(nameArray.length <= 0){
        throw new Error('Invalid name supplied');
    }
    return nameArray[0];
}

const getLastName = (fullName) => {
    const nameArray = fullName.split(' ').filter(filterEmptyStrings);
    console.log(JSON.stringify(nameArray, null, 2));
    const nameArrayLength = nameArray.length;
    if(nameArrayLength <= 0){
        throw new Error('Invalid name supplied');
    }
    return nameArray[nameArrayLength - 1];
};

const isValidPassword = (password) => {
    return password.length >= 8 && !password.toLowerCase().includes('password');
}

const filterEmptyStrings = (text => text.length > 0);

export {getFirstName, getLastName, isValidPassword};