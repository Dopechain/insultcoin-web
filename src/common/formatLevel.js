export function formatLevel(amount) {
  return {
    message: `${amountToLevel(amount)} (${amount} INSULT)`,
    classes: amountToEffect(amount),
  }
}

export function amountToEffect(amount) {
  // highest to lowest
  // >0 = yellow
  // >4 = orange
  // >8 = red
  // >16 = red bold
  // >32 = dark red
  // >64 = dark red extrabold
  // >128 = shaking effect, red super bold
  if (amount >= 128) {
    return "shake shake-constant font-black text-red-600"
  } else if (amount >= 64) {
    return "font-extrabold text-red-800"
  } else if (amount >= 32) {
    return "font-bold text-red-800"
  } else if (amount >= 16) {
    return "font-bold text-red-600"
  } else if (amount >= 8) {
    return "text-red-600"
  } else if (amount >= 4) {
    return "text-yellow-600"
  } else {
    return "text-yellow-500"
  }
}

export function amountToLevel(amount) {
  // highest to lowest
  // >0 = Annoyed
  // >4 = Upset
  // >8 = Frustrated
  // >16 = Mad
  // >32 = Angry
  // >64 = Furious
  // >128 = AAAAAAAGHHH
  if (amount >= 126) {
    return "AAAAAAAGHHH"
  } else if (amount >= 64) {
    return "Furious"
  } else if (amount >= 32) {
    return "Angry"
  } else if (amount >= 16) {
    return "Mad"
  } else if (amount >= 8) {
    return "Frustrated"
  } else if (amount >= 4) {
    return "Upset"
  } else {
    return "Annoyed"
  }
}
