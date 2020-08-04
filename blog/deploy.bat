:: 左边的两个冒号和rem的效果是类似的，都是注释的作用
:: 下面这段代码已经注释，如果去掉rem，那么包含echo off本身和后面的call命令都不会再打印
rem @echo off 
:: call表示在当前窗口执行后面的命令或调用其它脚本
call cd source/_posts
git pull origin master
cd ../../
hexo g -d