

rem check for java install
java -version 
if errorlevel 1 goto nojava

rem remove old apks
del app.unsigned.apk
del app.signed.apk
del app.signed.aligned.apk

rem unpack apk to temp folder
rmdir /S /Q tmp
if not exist tmp mkdir tmp
cd tmp
..\tools\7z x ..\srcapk\*.apk
cd ..

rem replace www directory with srcwww
rem this easier than deleting a list of files
rmdir /S /Q tmp\assets\www
xcopy srcwww\* tmp\assets\www /e /i /h /y

rem copy new html5 app in
xcopy html5\* tmp\assets\www /e /i /h /y

rem repack temp to apk
cd tmp
rmdir /S /Q "META-INF"
..\tools\7z a -tzip "..\app.unsigned.apk" "*" -mx9
cd ..

rem sign apk
java -jar tools\signapk.jar -w key\testkey.x509.pem key\testkey.pk8 app.unsigned.apk app.signed.apk

rem zip align
tools\zipalign -f 4 "app.signed.apk" "app.signed.aligned.apk"

exit

:nojava
echo You have not got java, which you need for this to work.
start http://www.java.com/getjava