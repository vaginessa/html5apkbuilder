
setlocal 

rem check for java install
java -version 
if errorlevel 1 goto nojava

rem determine srcapk
for /f "delims=" %%F in ('dir srcapk\*.apk /b /o-n') do set srcApk=%%F
echo source APK file will be %srcApk%

rem read variables from ini file
rem for/do is here to set a variable value to the output of an executable #doslol
echo parse ini file:
for /F "tokens=*" %%i in ('tools\ini.bat /s apk /i icon html5.ini') do set appIcon=%%i
for /F "tokens=*" %%i in ('tools\ini.bat /s apk /i name html5.ini') do set appName=%%i

echo icon = %appIcon%
echo name = %appName%

rem remove old apks
if exist app.unsigned.apk del app.unsigned.apk
if exist app.signed.apk del app.signed.apk
if exist app.signed.aligned.apk del app.signed.aligned.apk

rem unpack apk to temp folder
rmdir /S /Q tmp
if not exist tmp mkdir tmp
cd tmp
..\tools\7z x ..\srcapk\*.apk
cd ..
rem java -jar tools\apktool.jar decode -s srcapk\%srcApk% tmp

rem replace www directory with srcwww
rem this easier than deleting a list of files
rmdir /S /Q tmp\assets\www
xcopy srcwww\* tmp\assets\www /e /i /h /y

rem update names
rem extract manifest
java -jar tools\AXMLPrinter2.jar tmp\AndroidManifest.xml > tmp\AndroidManifest.decoded.xml

rem re-encode manifest
rem todo 

rem copy new html5 app in
xcopy html5\* tmp\assets\www /e /i /h /y

rem repack temp to apk
cd tmp
rmdir /S /Q "META-INF"
..\tools\7z a -tzip "..\app.unsigned.apk" "*"
cd ..
rem SET PATH=%PATH%;%CD%\tools
rem java -jar tools\apktool.jar build -a tools\aapt.exe tmp app.unsigned.apk

rem sign apk
java -jar tools\signapk.jar -w key\testkey.x509.pem key\testkey.pk8 app.unsigned.apk app.signed.apk

rem zip align
tools\zipalign -f 4 "app.signed.apk" "app.signed.aligned.apk"

goto end

:nojava
echo You have not got java, which you need for this to work.
start http://www.java.com/getjava

:end
echo bye bye
