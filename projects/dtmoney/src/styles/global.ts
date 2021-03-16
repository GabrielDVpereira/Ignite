import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    :root {
      --backgroud: #f0f1f5; 
      --red: #E52E4D;
      --blue: #5429cc; 
      --blue-light: #6933FF; 
      --text-title: #363f5f; 
      --text-body: #969CB3; 
      --backgroud: #f0f2f5; 
      --shape: #FFFF;

    }

    *{
      margin: 0; 
      padding: 0; 
      box-sizing: border-box; 
    }

    
    /* adapt the app font for different layouts (Desktop, Mobile)*/
    html {
      @media(max-width: 1080px){
        /* 16px *93.75 = 15px */
        font-size: 93.75%; 
      }

      @media(max-width: 720px){
        /* 16px*87.5 = 14px */
        font-size: 87.5%;
      }
    }

    body {
      background: var(--backgroud);
      -webkit-font-smoothing: antialiased; 
      
    }

    body, input, textarea, button {
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
    }

    h1, h2, h3 ,h4 , h5 ,h5, strong {
      font-weight: 600;
    }

    button {
      cursor: pointer;
    }

    [disabled] {
      opacity: 0.6; 
      cursor: not-allowed;
    }
`;
