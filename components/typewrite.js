const TypeWrite = styled.p`
  overflow: hidden;
  border-right: 0.1em solid orange;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.1em;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 50%;
    }
  }

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
`

export default TextWrite
