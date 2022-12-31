//Generate a random number between 0 to range-1 which is not in the list given
function random(range,exclude){
    let rand = Math.floor(Math.random()*range);
    while(exclude.includes(rand)){
        rand = Math.floor(Math.random()*range);
    }
    return rand;
}

// Generate 8 random numbers between 0 to k (first one is always 0)
function generateIndices(k){
    let indices = [0];
    while(indices.length < 8){
        indices.push(random(k,indices));
    }
    return indices;
}

// Specify allowed password characters
let alphaUpper = 'ABCDEFGHIJKLMNOPQRST';
let alphaLower = 'abcdefghijklmnopqrstuvwxyz';
let digits = '0123456789';
let symbols = '!@$*.';
let arr = [alphaLower,alphaUpper,digits,symbols];

// Generate password of length n(>7) having atleast two of each of above categories
// Note: Every password starts with a lower case alphabet
exports.generatePassword = (n)=>{
    //Initialize the password array
    let password = [];
    while(password.length < n)
        password.push('x');
    
    let indices = generateIndices(n);
    //Set each category into the given indices
    let sel;
    for(let i=0;i<8;i++){
        let j = Math.floor(i/2);
        password[indices[i]] = arr[j][random(arr[j].length,[])];
    }
    //Fill the remaining spaces with random things
    for(let i=1;i<n;i++){
        if(!indices.includes(i)){
            sel = arr[random(4,[])];
            password[i] = sel[random(sel.length,[])];
        }
    }
    return password.join('');
}