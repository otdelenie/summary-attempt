var enter = document.getElementById('enter');
var submit = document.getElementById('submit');
var lis = document.getElementById('list')
const api_key = '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'
const api_key2 = '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'

submit.onclick = async function(){
    var input = enter.value
    if(input!=''){
        var message = document.createElement('li');
        message.innerText = input
        message.className = 'item';

        lis.appendChild(message)

        enter.value = ''
        
        try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + api_key,
                'HTTP-Referer': 'http://localhost',  // ✅ Укажи свой сайт или просто localhost
                'X-Title': 'MyChatApp'               // ✅ Название проекта (любое)
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct',  // ✅ Бесплатная модель
                messages: [{ role: 'user', content: input }]
            })
        });

        const data = await response.json();

        if (!data.choices || !data.choices[0]) {
            console.error('Ошибка:', data);
            const errorMessage = document.createElement('li');
            errorMessage.innerText = '❌ Ошибка: ' + (data.error?.message || 'неизвестная ошибка');
            errorMessage.className = 'item';
            lis.appendChild(errorMessage);
            return;
        }

        const gptReply = data.choices[0].message.content;

        const botMessage = document.createElement('li');
        botMessage.innerText = '🤖: ' + gptReply;
        botMessage.className = 'item';
        lis.appendChild(botMessage);

    } catch (error) {
        console.error('Ошибка запроса:', error);
        const errorMessage = document.createElement('li');
        errorMessage.innerText = '❌ Ошибка сети или ключа';
        errorMessage.className = 'item';
        lis.appendChild(errorMessage);
    }
};

    // }
    // else{
    //     alert('Print message')
    // }
}