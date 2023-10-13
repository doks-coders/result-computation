export const centerFlex = {justifyContent:'center',alignItems:'center'}
export const landingPagelineHeight = 1.3

export const normalButton={
    transition:'.3 ease',
    transform: 'scale(1)',
    bg:'white',
    color:'black'
}
export const animatedButton = {
    transition:'.3 ease',
    transform: 'scale(1.2)',
    bg:'black',
    color:'white'
}

export const getRandomString=(length) =>{
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
      }
      return result;
    }