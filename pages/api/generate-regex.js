// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const systemPrompt = `Sen kullanıcıdan aldığın bilgiye göre regex deseni üreten bir araçsın.

Kullanıcı sana soru sorduğunda, bununla ilgili bir regex deseni üretebiliyorsan şu formatta bir JSON döndüreceksin:

{
     "description": "kullanıcının istediği regex örneğine ait başlık.",
     "pattern": "ilgili regex kodu.",
     "example": "kullanıcının sorusuna göre üretilmiş regex deseninin 
     kullanıldığı örnek javascript kodu."
}

Eğer kullanıcıdan aldığın bilginin bir regex karşılığı yok ise sadece ve sadece "NO_REGEX" yaz!!!`;

export default async function handler(req, res) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `eposta kontrolü, sadece .edu.tr domainleri geçerli olsun`,
      },
    ],
  });

  let response;

  try {
    response = JSON.parse(completion.data.choices[0].message.content);
  } catch (e) {
    response = {
      error: true,
    };
  }

  res.status(200).json(response);
}
