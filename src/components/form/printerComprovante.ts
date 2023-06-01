import { ThermalPrinter, PrinterTypes, characterSet, breakLine } from 'node-thermal-printer';

export async function printerComprovante() {
  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: '//localhost/POS58 Printer',
    options: {
      timeout: 1000,
    },
    width: 48,
    characterSet: characterSet.PC860_PORTUGUESE,
    breakLine: breakLine.WORD,
    removeSpecialCharacters: false,
    lineCharacter: '-',
  });

  printer.newLine();
  printer.alignCenter();
  printer.setTextDoubleWidth();
  printer.println('Comprovante');
  printer.setTextDoubleHeight();
  printer.newLine();
  printer.println('Clima Organizacional Magius');
  printer.setTextNormal();
  printer.newLine();
  printer.drawLine();

  printer.newLine();
  printer.setTextNormal();
  printer.alignCenter();
  printer.println('Obrigado por responder ');
  printer.alignCenter();
  printer.println('o nosso formulario.');

  printer.newLine();
  printer.newLine();
  printer.alignLeft();
  printer.setTextNormal();
  printer.println('Valorizamos sua participacao');
  printer.alignCenter();
  printer.println('e feedback.');

  printer.cut();

  try {
    await printer.execute();
    console.log('Print success.');
  } catch (error) {
    console.error('Print error:', error);
  }
}
