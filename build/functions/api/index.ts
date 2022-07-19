//build target
const token = ""

//DON'T CHANGE LINES ABOVE!

interface Context {
  request: Request;
  env: unknown & { ASSETS: { fetch: typeof fetch } };
  params: Params<any>;
  waitUntil(promise: Promise<any>): void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data: Record<string, unknown>;
}

enum Type {
  undefined,
  confirmation,
  message_new,
  message_reply,
  message_edit,
}

//TODO
// class Message {
//   id: number;
//   date: number;
//   peer_id: number;
//   from_id: number;
//   text: string;
//   random_id: number;
//   ref: string;
//   ref_source: string;
//   //attachments: (photo|video|audio|doc|link|market|market_album|wall|wall_reply|sticker|gift)[]
//   important : boolean;
//   //geo: Geo;
//   //keyboard: Keyboard;
//   fwd_messages: Message[]
//   //action: Action
//   admin_author_id: number
//   conversation_message_id:

//   constructor(obj: any) {
//   }
// }

class Callback {
  type: Type;
  event_id: number;
  v: string;
  object: any;
  group_id: number;

  constructor(obj: any) {
    switch (obj.type) {
      case "confirmation":
        this.type = Type.confirmation;
        break;
      case "message_new":
        this.type = Type.message_new;
        break;
      default:
        console.log(obj.type)
        throw new Error("fuck u, i don't wanna implement it");
    }
    this.event_id = obj.event_id;
    this.v = obj.v;
    this.object = obj.object;
    this.group_id = obj.group_id;
  }
}

// function send(text: string, random_id: number, peer_id: number, reply_to: number, disable_mentions: number, v: 5.131): void {

// }
async function send(peer_id: number, text?: string, attachment?: string): Promise<Response> {
  var url = "https://api.vk.com/method/messages.send?random_id=0&access_token=" + token + "&v=5.131" + "&peer_id=" + peer_id
  if (text != "") {
    url = url + "&message=" + text
  }
  if (attachment != "") {
    url = url + "&attachment=" + attachment
  }
  const a = await fetch(url)
  const resp = await a.text()
  console.log(resp)
  if (JSON.parse(resp).hasOwnProperty('error')) {
    return new Response(resp)
  } else {
    return new Response("ok")
  }
}

export async function onRequest(context: Context): Promise<Response> {
  try {
    const {
      request, // same as existing Worker API
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
      waitUntil, // same as ctx.waitUntil in existing Worker API
      next, // used for middleware or to fetch assets
      data, // arbitrary space for passing data between middlewares
    } = context;
    //a[0]
    //JSON.stringify()
    //const info = JSON.stringify(data, null, 2);
    //return new Response(b.toString() + "abc");

    //console.log(JSON.parse(await request.text()))
    const callback = new Callback(JSON.parse(await request.text()));
    //const callback = await request.json<Callback>();

    const peer_id = callback.object.message.peer_id;

    switch (callback.type) {
      case Type.confirmation:
        if (callback.group_id == 206250650) {
          console.log("Confirmation!");
          return new Response("421db0a8");
        } else {
          return new Response(
            "УБЛЮДОК, МАТИ ТВОЮ! А НУ ЙДИ СЮДИ, ГІВНО СОБАЧЕ! А? ЗДУРУ ВИРІШИВ ДО МЕНЕ ЛІЗТИ, ТИ ЗАСРАНЕЦЬ СМЕРДЮЧИЙ, МАТИ ТВОЮ! А? НУ ЙДИ СЮДИ, СПРОБУЙ МЕНЕ ТРАХНУТИ! Я ТЕБЕ САМ ТРАХНУ! УБЛЮДОК, ОНАНІСТ ЧОРТІВ, БУДЬ ТИ ПРОКЛЯТИЙ! ІДИ, ІДІОТ! ТРАХАЙ ТЕБЕ І ВСЮ ТВОЮ СІМ'Ю. ГІВНО СОБАЧЕ, ЖЛОБ СМЕРДЮЧИЙ! ЛАЙНО, СУКА, ПАДЛА! ІДИ СЮДИ, МЕРЗОТНИК, НЕГІДНИК, ГАД! ІДИ СЮДИ, ТИ ГІВНО, ЖОПА!"
          );
        }
      case Type.message_new:
        const text = callback.object.message.text as string
        if (["/", "!", "a"].includes(text[0])) {
          switch (text.slice(1).normalize().toLowerCase()) {
            case "ping":
            case "пинг":
              const resp = send(peer_id, "pong")
              return resp
            case "r34":
              for (const post of JSON.parse(await (await fetch("https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=2&pid=0&tags=furry&json=1")).text())) {
                //const resp = await send(peer_id, post.file_url, await linktophotoattachment(peer_id))
                //return resp
                const fd = new FormData
                fd.append("img", await (await fetch(post.file_url)).blob(), "image");
                return send(peer_id, post.file_url, await (await fetch(await linktophotoattachment(peer_id), {method: "post", body: fd})).json<object>().photo)
                //return new Response(await linktophotoattachment(peer_id))
              }
          }

        }

        return new Response("ok")

        break;
      case Type.message_reply:
        //const message = new Message(callback.object);
        break;
      case Type.message_edit:
        //const message = new Message(callback.object);
        break;
    }

    console.log(callback.type);
    console.log(callback.group_id);
    console.log(typeof callback);
    console.log(callback);
    return new Response();
  } catch (e) {
    return new Response(e.name + ': ' + e.message)
  }
}
async function linktophotoattachment(peer_id: number): Promise<string> {
  
  const resp = JSON.parse(await (await fetch(
    "https://api.vk.com/method/photos.getMessagesUploadServer?&access_token=" +
    token + "&v=5.131&peer_id=" + peer_id)).text())
  return resp.response.upload_url
  //const resp2 = JSON.stringify(resp)
  //response.upload_url;
  //return resp2
}

