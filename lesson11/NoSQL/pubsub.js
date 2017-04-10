let redis = require("redis")
  , subscriber = redis.createClient()
  , publisher  = redis.createClient();

subscriber.on("message", (channel, message) => {
  console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
});

subscriber.subscribe("test");

publisher.publish("test", "haaaaai");
publisher.publish("test", "kthxbai");