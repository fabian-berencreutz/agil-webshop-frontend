# Undersök betalning för webbshoppen

## 1. Stripe

Stripe är en betalplattform för bland annat kortbetalningar och andra betalningsmetoder.

### Hur integrationen fungerar

Kunden klickar på en betalningsknapp i frontend. Backend skapar en Checkout Session hos Stripe och kunden skickas vidare till Stripes betalningssida.

### Testmiljö

Stripe har ett testläge där man kan använda testkort och prova betalningar utan riktiga pengar.

### Vad behövs

Frontend behöver en betalningsknapp.

Backend behöver skapa Checkout Sessions och hantera betalningsresultatet, till exempel med webhooks.

### Fördelar

- bra dokumentation
- enkel testmiljö
- färdig checkout-sida
- stöd för flera betalningsmetoder

### Nackdelar

- kräver Stripe-konto och API-nycklar
- backend behöver hantera betalningsstatus
- transaktionsavgifter tillkommer i en riktig lösning

## 2. Klarna

Klarna kan användas för bland annat direktbetalning, betala senare och delbetalning.

### Hur integrationen fungerar

Frontend visar Klarna som betalningsalternativ och backend kommunicerar med Klarnas API för att skapa och hantera betalningen.

### Testmiljö

Klarna har en testmiljö som heter Playground. För att använda den behöver man skapa ett testkonto och logga in i Klarna Partner Portal.

I Playground kan man bland annat använda:

- API-nycklar
- client-id
- testdata för betalningar

### Vad behövs

Frontend behöver kunna starta betalningsflödet.

Backend behöver använda Klarnas API och hantera betalningen.

### Fördelar

- testmiljö finns
- flera betalningsalternativ
- välkänt i Sverige
- API och Web SDK finns

### Nackdelar

- kräver konto och konfiguration i Partner Portal
- fler steg att konfigurera
- API-nycklar måste hanteras säkert i backend

## 3. Swish

Swish är en betalningslösning där kunden godkänner betalningen direkt i Swish-appen.

### Hur integrationen fungerar

Kunden väljer Swish som betalningsmetod och godkänner betalningen i appen.

Kunden behöver inte skriva in sina bankuppgifter i webbshoppen. I betalningsflödet visas i stället information som mottagarens namn och Swish-nummer.

### Testmiljö

Swish har dokumentation för utvecklare och stöd för testmiljö, men integrationen kräver mer teknisk konfiguration.

### Vad behövs

Frontend behöver kunna starta Swish-betalningen.

Backend behöver kommunicera med Swish API och kontrollera betalningens status.

### Fördelar

- snabb betalning
- kunden behöver inte lämna bankuppgifter till webbshoppen
- välkänt i Sverige
- betalningen godkänns i Swish-appen

### Nackdelar

- kräver integration mot Swish API
- mer teknisk konfiguration
- främst anpassat för Sverige

## Källor

### Stripe

- https://docs.stripe.com/
- https://docs.stripe.com/payments/checkout
- https://docs.stripe.com/testing

### Klarna

- https://docs.klarna.com/

### Swish

- https://developer.swish.nu/
