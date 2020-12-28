$.ajax({
    url: '/test',
    type: 'POST',
    data: {
        message: 'hi'
    },
    success: ({ code }) => {
        console.log(code);
    }
});