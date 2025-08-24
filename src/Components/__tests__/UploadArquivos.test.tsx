import React from 'react';
import { shallow } from 'enzyme';

import { UploadArquivos } from '../upload_arquivos';

describe('UploadArquivos', () => {
  it('Jest: componente existe', () => {
    expect(UploadArquivos).toBeDefined();
  });

  it('Enzyme: botão "Enviar" inicia desabilitado', () => {
    const w = shallow(<UploadArquivos />);
    const btn = w.find('button').at(0); // primeiro botão é o "Enviar"
    expect(btn.prop('disabled')).toBe(true);
  });
});
