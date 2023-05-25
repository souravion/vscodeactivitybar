import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  // Create a command for the button
  const buttonCommand = vscode.commands.registerCommand('extension.buttonCommand', () => {
    // Show the webview
    const panel = vscode.window.createWebviewPanel(
      'myExtensionView',
      'My Extension View',
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );

    // Load the HTML content
    const htmlPath = vscode.Uri.file(path.join(context.extensionPath, 'view', 'index.html'));
    const htmlContent = htmlPath.with({ scheme: 'vscode-resource' });
    panel.webview.html = getWebviewContent(htmlContent);
  });

  // Register the button command
  context.subscriptions.push(buttonCommand);
}

export function deactivate() {}

function getWebviewContent(htmlContent: vscode.Uri): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Extension View</title>
      <style>
        /* Add your custom styles here */
      </style>
      <script>
        function openInputBox() {
          const inputValue = window.prompt("Enter a value:");
          if (inputValue) {
            // Handle the entered value
            alert("Entered value: " + inputValue);
          }
        }
      </script>
    </head>
    <body>
      <div>
        <!-- Your activity bar button -->
        <button onclick="openInputBox()">My Button</button>
      </div>
    </body>
    </html>
  `;
}