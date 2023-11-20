```
Senddocumentwithouttemplate
```
```
[Junior]Quizz+APIext
```
```
Front:
InterfacesimplesousAngular+NgZorro:
● unezonededrag&dropdefichier
● uninputsimplepouryrenseignerl'adressemaildel'étudiant
● uninputselectdetypetokenisationautomatiquepouryrentrerlesadressesemailsdeplusieurs
intervenantsexternes
● unboutond'envoi
```
```
Back:
Frameworkauchoixentreexpressetfastify.Utilisationdetypescriptobligatoireetunplussieslint
etprettiersontcorrectementsetup.
```
Utiliserlaroutehttps://ext.edusign.fr/doc/#api-Students-GetStudentByEmailEmailpourrécupérerl'IDde
chaqueétudiantàpartirdesonemail.


```
Etlaroutehttps://ext.edusign.fr/doc/#api-Externals-GetExternalsExternalidpourrécupérerl'IDde
chaqueexterneàpartirdesonemail.
```
```
Puisutiliserlaroutepourhttps://ext.edusign.fr/doc/#api-Deprecated-PostV1DocumentV2SendTemplate
envoyerledocumentàsignerauxdestinataires.
```
```
"signatories":[{
"type":"student",//maximum 1 studentparenvoi
"id":"xxxxxxxx",
"elements":[{
"type":"",
"position":{
"page":"1",
"x":"200",
"y":"200"
}
}]
}]
```
```
Laisserletypedel'élémentvide(seraconsidérécommeunchampsignaturepardéfaut),
sendDocumentToRecipientsàtrue,mettretouslesparamètresdeemailReminderà 0 pourle
désactiveretlaisserdirectoryIdvide.
```
TOKEN:***REMOVED***
user_id:***REMOVED***

Adressesmail:

- Students:dylan+385753@edusign.fr
- Externe:sebastien+391948@edusign.fr

```
Unrepodebasepourletest:
https://github.com/DydjyZ/technical-test-boilerplate
```
