interface Context {
  request: Request;
  env: unknown & { ASSETS: { fetch: typeof fetch; }; };
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
  message_typing_state,
}

class Callback {
  type: Type;
  object: any;
  group_id: number;

  constructor(obj: any) {
    switch (obj.type) {
      case "confirmation":
        this.type = Type.confirmation
        this.group_id = obj.group_id
        break;
      case "message_new":
        t

      default:
        throw new Error("fuck u, i don't wanna implement it");
    }
  }
}

export async function onRequest(context: Context): Promise<Response> {

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
  const callback = new Callback(JSON.parse(await request.text()))
  //const callback = await request.json<Callback>();

  switch (callback.type) {
    case Type.confirmation:
      if (callback.group_id == 206250650) {
        console.log("Confirmation!")
        return new Response("421db0a8")
      } else {
        return new Response("УБЛЮДОК, МАТИ ТВОЮ! А НУ ЙДИ СЮДИ, ГІВНО СОБАЧЕ! А? ЗДУРУ ВИРІШИВ ДО МЕНЕ ЛІЗТИ, ТИ ЗАСРАНЕЦЬ СМЕРДЮЧИЙ, МАТИ ТВОЮ! А? НУ ЙДИ СЮДИ, СПРОБУЙ МЕНЕ ТРАХНУТИ! Я ТЕБЕ САМ ТРАХНУ! УБЛЮДОК, ОНАНІСТ ЧОРТІВ, БУДЬ ТИ ПРОКЛЯТИЙ! ІДИ, ІДІОТ! ТРАХАЙ ТЕБЕ І ВСЮ ТВОЮ СІМ'Ю. ГІВНО СОБАЧЕ, ЖЛОБ СМЕРДЮЧИЙ! ЛАЙНО, СУКА, ПАДЛА! ІДИ СЮДИ, МЕРЗОТНИК, НЕГІДНИК, ГАД! ІДИ СЮДИ, ТИ ГІВНО, ЖОПА!")
      }
    case Type.message_new:
      break
    case Type.message_reply:
      break
    case Type.message_edit:
      break
    case Type.message_typing_state:
      break
  }

  console.log(callback.type)
  console.log(callback.group_id)
  console.log(typeof callback)
  console.log(callback)
  return new Response();
}