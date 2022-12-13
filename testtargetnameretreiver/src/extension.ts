// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as rd from 'readline'

function getTargetName()
{
    let filePath = vscode.window.activeTextEditor?.document.uri;
    const fsPath: string = filePath?.fsPath !== undefined ? filePath.fsPath : '';
    if (fsPath === '')
    {
        return '';
    }
    const dirPath = path.dirname(fsPath);
    const cmakePath = path.join(dirPath, "CMakeLists.txt");

    var textByLine = fs.readFileSync(cmakePath).toString('utf-8'),
        regexp = new RegExp('(?<=add_test_project\\(\\n).*(?=\\n)'),
        targetName = regexp.exec(textByLine);

    return targetName?.toString() !== undefined ? targetName.toString() : '';
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "testtargetnameretreiver" is now active!');
	let disposable = vscode.commands.registerCommand('testtargetnameretreiver.helloWorld', () => {
		vscode.window.showInformationMessage(getTargetName());
        const returnStr = getTargetName().trim();
        return returnStr;
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
