# Köra email-service lokalt

För att email-service ska kunna skicka mejl lokalt behöver man lägga in två miljövariabler i sin Run Configuration i IntelliJ:

`EMAIL_USER = din Gmail-adress`  
`EMAIL_PASS = ett Google App Password`

Ett vanligt Gmail-lösenord fungerar inte. Man behöver skapa ett särskilt App Password i sitt Google-konto.

## Så gjorde jag

1. Aktivera tvåstegsverifiering på Google-kontot om det inte redan är gjort.
2. Gå till Google-konto → Säkerhet → Applösenord.
3. Skapa ett nytt applösenord, till exempel med namnet `email-service`.
4. Lägg Gmail-adressen som `EMAIL_USER`.
5. Lägg applösenordet som `EMAIL_PASS` i IntelliJ under Environment variables.
6. Starta `email-service` med profilen `local`.

## Test

För att testa lokalt kan man öppna:

`http://localhost:8083/send-test`

Jag använder port `8083` lokalt hos mig.

Om allt fungerar ska:

- webbläsaren visa `Message sent!`
- konsolen visa `Received message from RabbitMQ`
- konsolen visa `Email sent successfully!`
- mejlet komma fram till mottagarens inkorg

## Vanligt fel

Om man får:

`MailAuthenticationException`

eller:

`Too many login attempts`

så är det oftast problem med Gmail-inloggningen.

Kontrollera att `EMAIL_PASS` är ett Google App Password och inte det vanliga Gmail-lösenordet.

Vänta en stund om Google tillfälligt har blockerat fler inloggningsförsök.

## Viktigt

Lägg aldrig riktiga lösenord eller App Passwords i GitHub.
