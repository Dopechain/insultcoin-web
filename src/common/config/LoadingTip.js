let tips = [
  "if you actually bought this then thats hilarious",
  "bitcoin? is that a ripoff of insultcoin",
  "who even uses banks these days",
  "we literally applied blockchain in a field where its not designed for, but you still use it anyway",
  "if someone is beating you in a video game, insult them here",
  "BITCONNNNNNEEEEEEEEEEEEEEEECCCCCCCCTTTTTTTTT",
  "i can't believe you're using this",
  "haha head spinny",
  "why are you even using this",
  "go outside please",
  "the majority of this is homemade spaghetti code",
  "ERROR 404 MESSAGE NOT FOUND",
  "minceraft",
  "remember to buy the (chip) dip",
  "please pump this coin to the moon",
  "we're like tinder but for insults",
  "INSULT: Insultingly Nasty, Stupid, Unnecessary, and Legitimately Terrible",
  "Pass the cheese!",
  "If you aren't satisfied with a normal insult, try this",
  "money printer go brrrrrrrrrrrrrrrr",
  "never gonna give you up, never gonna let you down",
  "do not do the dog",
  "sir, this is a wendy's",
]

let prev = 0

function random(mn, mx) {
  return Math.floor(Math.random() * (mx - mn) + mn)
}

export default {
  // RNG is biased against showing the same tip
  rand: function () {
    let rNumber = random(0, tips.length)
    if (prev == rNumber) {
      rNumber = random(0, tips.length)
    }
    prev = rNumber
    return tips[rNumber]
  },
  raw: tips,
}
