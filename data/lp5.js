window.EXAM_DATA = {
 "id": "lp5",
 "title": "LP5 · Process financial operations in Business Central",
 "title_es": "LP5 · Procesar operaciones financieras en Business Central",
 "cases": {},
 "questions": [
  {
   "id": "lp5q1",
   "type": "mc",
   "en": "A company uses Dynamics 365 Business Central to manage receivables.<br><br>You must import a series of payments from a bank account and automatically match the payments against similar ledger entries already entered in Business Central.<br><br>You need to import and apply the payments to the ledger entries that are automatically matched by the system.<br><br>Which form should you use?",
   "es": "Debes importar una serie de pagos de una cuenta bancaria y emparejarlos automáticamente con los movimientos ya registrados en Business Central.<br><br>¿Qué página debes usar?",
   "src": "Topic 2 · Q1",
   "options": [
    {
     "id": "A",
     "en": "Payment services",
     "es": "Payment services"
    },
    {
     "id": "B",
     "en": "Payment Application Rules",
     "es": "Payment Application Rules"
    },
    {
     "id": "C",
     "en": "Payment Reconciliation Journal",
     "es": "Payment Reconciliation Journal (diario de conciliación de pagos)"
    },
    {
     "id": "D",
     "en": "Payment Registration",
     "es": "Payment Registration"
    }
   ]
  },
  {
   "id": "lp5q2",
   "type": "mr",
   "en": "A company uses Dynamics 365 Business Central for their receivables.<br><br>The company wants to mark any automatically matched payments to open invoices as not requiring a review if they match the highest degree of confidence that the two transactions are a match.<br><br>You need to configure payment matching rules.<br><br>Which three criteria should you configure? Each correct answer presents part of the solution.<br><br>NOTE: Each correct selection is worth one point.",
   "es": "La empresa quiere que los pagos emparejados automáticamente con facturas abiertas con el máximo nivel de confianza se marquen como \"no requieren revisión\".<br><br>Debes configurar las reglas de emparejamiento. ¿Qué tres criterios debes configurar?",
   "src": "Topic 2 · Q23",
   "options": [
    {
     "id": "A",
     "en": "Statement amount",
     "es": "Statement amount (importe del extracto)"
    },
    {
     "id": "B",
     "en": "Account number",
     "es": "Account number (número de cuenta)"
    },
    {
     "id": "C",
     "en": "Related-party fields",
     "es": "Related-party fields (datos del tercero)"
    },
    {
     "id": "D",
     "en": "Transaction date",
     "es": "Transaction date (fecha de la transacción)"
    },
    {
     "id": "E",
     "en": "Transaction text",
     "es": "Transaction text (texto de la transacción)"
    }
   ],
   "select": 3
  },
  {
   "id": "lp5q3",
   "type": "mc",
   "en": "A company uses Dynamics 365 Business Central.<br><br>A user posts a Sales Invoice document that has an incorrect dimension value.<br><br>You need to update general ledger entries with the correct dimension value without inserting new ledger entries.<br><br>Which option should you use?",
   "es": "Un usuario registra una factura de venta con un valor de dimensión incorrecto.<br><br>Debes actualizar los movimientos de contabilidad con el valor correcto sin crear movimientos nuevos. ¿Qué opción debes usar?",
   "src": "Topic 2 · Q33",
   "options": [
    {
     "id": "A",
     "en": "Correct Dimensions",
     "es": "Correct Dimensions"
    },
    {
     "id": "B",
     "en": "Edit List",
     "es": "Edit List"
    },
    {
     "id": "C",
     "en": "Edit In Excel",
     "es": "Edit in Excel"
    },
    {
     "id": "D",
     "en": "Reverse Transaction",
     "es": "Reverse Transaction"
    }
   ]
  },
  {
   "id": "lp5q4",
   "type": "mc",
   "en": "Two cash receipts were applied to a posted sales transaction. The first receipt was applied in error.<br><br>You need to remove the first cash receipt from the posted sales transaction.<br><br>Which set of steps should you perform?",
   "es": "Se aplicaron dos cobros a una venta registrada y el primero se aplicó por error.<br><br>Debes quitar el primer cobro de la venta registrada. ¿Qué pasos debes seguir?",
   "src": "Topic 4 · Q18",
   "options": [
    {
     "id": "A",
     "en": "1. Navigate to Unapply Entries from the relevant customer ledger entry. 2. Unapply the second payment. 3. Unapply the first payment. 4. Apply the second payment to the customer ledger entry.",
     "es": "1. Abrir Unapply Entries desde el movimiento de cliente. 2. Desliquidar el segundo pago. 3. Desliquidar el primero. 4. Volver a liquidar el segundo pago con el movimiento."
    },
    {
     "id": "B",
     "en": "1. Navigate to Reverse Transaction from the relevant detailed customer ledger entry. 2. Reverse the second payment. 3. Reverse the first payment. 4. Apply the second payment to the customer ledger entry.",
     "es": "1. Abrir Reverse Transaction desde el movimiento detallado de cliente. 2. Revertir el segundo pago. 3. Revertir el primero. 4. Liquidar el segundo pago."
    },
    {
     "id": "C",
     "en": "1. Navigate to Reverse Transaction from the relevant customer ledger entry. 2. Reverse the second payment. 3. Reverse the first payment. 4. Apply the second payment to the customer ledger entry.",
     "es": "1. Abrir Reverse Transaction desde el movimiento de cliente. 2. Revertir el segundo pago. 3. Revertir el primero. 4. Liquidar el segundo pago."
    },
    {
     "id": "D",
     "en": "1. Post a reversing Cash Receipt and select the customer and relevant payment entry. 2. Navigate to Unapply Entries from the relevant customer ledger entry. 3. Unapply the payment.",
     "es": "1. Registrar un cobro inverso seleccionando el cliente y el pago. 2. Abrir Unapply Entries desde el movimiento de cliente. 3. Desliquidar el pago."
    }
   ]
  },
  {
   "id": "lp5q5",
   "type": "hotspot",
   "en": "A company uses Dynamics 365 Business Central. There are three departments (ADM, PROD and SALES) that are set up as dimensions.<br><br>A customer wants to speed up the purchase invoice entry process for building materials by having the AP clerks fill purchase invoices without using dimensions. Monthly building expenses can vary between $5,000-$7,000 per month. The allocation of building expenses is as follows:<br><table class=\"qtable\"><tr><th>Department</th><th>Allocation</th></tr><tr><td>PROD</td><td>50 percent</td></tr><tr><td>SALES</td><td>25 percent</td></tr><tr><td>ADM</td><td>25 percent</td></tr></table><br>Allocation of the monthly building expense between dimensions is required at the end of each month.<br><br>You need to configure the system to automatically allocate building expense total balances each month between dimensions.<br><br>How should you configure recurring general journals? To answer, select the appropriate options in the answer area.<br><br>NOTE: Each correct selection is worth one point.",
   "es": "Hay tres departamentos (ADM, PROD y SALES) configurados como dimensiones. Para agilizar la entrada de facturas de compra de materiales de construcción, los administrativos las registran sin dimensiones. El gasto mensual varía entre 5.000 y 7.000 $ y se reparte así:<br><table class=\"qtable\"><tr><th>Departamento</th><th>Reparto</th></tr><tr><td>PROD</td><td>50 %</td></tr><tr><td>SALES</td><td>25 %</td></tr><tr><td>ADM</td><td>25 %</td></tr></table><br>El reparto del saldo entre dimensiones debe hacerse al final de cada mes, automáticamente.<br><br>¿Cómo debes configurar el recurring general journal (diario periódico)?",
   "src": "Topic 1 · Q35",
   "rowsHeader": [
    "Requirement",
    "Solution component"
   ],
   "rows": [
    {
     "en": "Select recurring method",
     "es": "Recurring method",
     "options": [
      {
       "id": "a",
       "en": "F Fixed",
       "es": "F Fixed"
      },
      {
       "id": "b",
       "en": "V Variable",
       "es": "V Variable"
      },
      {
       "id": "c",
       "en": "RF Reversing Fixed",
       "es": "RF Reversing Fixed"
      },
      {
       "id": "d",
       "en": "BD Balance by Dimension",
       "es": "BD Balance by Dimension"
      }
     ]
    },
    {
     "en": "Set up recurring frequency",
     "es": "Recurring frequency",
     "options": [
      {
       "id": "a",
       "en": "1M",
       "es": "1M"
      },
      {
       "id": "b",
       "en": "1D",
       "es": "1D"
      },
      {
       "id": "c",
       "en": "CM-1D",
       "es": "CM-1D"
      },
      {
       "id": "d",
       "en": "1D+1M-1D",
       "es": "1D+1M-1D"
      }
     ]
    },
    {
     "en": "Set up amount field",
     "es": "Campo Amount",
     "options": [
      {
       "id": "a",
       "en": "$5,000",
       "es": "5.000 $"
      },
      {
       "id": "b",
       "en": "0",
       "es": "0"
      },
      {
       "id": "c",
       "en": "-$5,000",
       "es": "-5.000 $"
      },
      {
       "id": "d",
       "en": "$7,000",
       "es": "7.000 $"
      }
     ]
    }
   ]
  },
  {
   "id": "lp5q6",
   "type": "mc",
   "en": "A company is using Dynamics 365 Business Central. The finance manager creates a new general ledger (G/L) account.<br><br>You need to configure the system to include the G/L account in the general journal reconciliation window.<br><br>What should you do?",
   "es": "El responsable financiero crea una nueva cuenta de contabilidad.<br><br>Debes hacer que aparezca en la ventana de conciliación (Reconciliation) del general journal. ¿Qué debes hacer?",
   "src": "Topic 1 · Q43",
   "options": [
    {
     "id": "A",
     "en": "Add this G/L account to the Bank Account Posting Group.",
     "es": "Añadir la cuenta al Bank Account Posting Group."
    },
    {
     "id": "B",
     "en": "Enable the Direct Posting field in the G/L account card.",
     "es": "Activar Direct Posting en la ficha de la cuenta."
    },
    {
     "id": "C",
     "en": "Enable the Reconciliation Account field in the G/L account card.",
     "es": "Activar Reconciliation Account en la ficha de la cuenta."
    },
    {
     "id": "D",
     "en": "Create a new payment reconciliation journal.",
     "es": "Crear un payment reconciliation journal nuevo."
    }
   ]
  },
  {
   "id": "lp5q7",
   "type": "yn",
   "en": "<b>Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.</b><br><br>A manufacturing company is using Dynamics 365 Business Central for fixed assets.<br><br>The company used a purchase order to acquire a new machine. The company received a separate invoice from a different vendor for the installation and delivery fees related to the purchase.<br><br>The company requires these acquisition costs to be added to the machine so that the total acquisition cost can be capitalized and then depreciated over the useful life of the asset.<br><br>You need to configure the solution.<br><br>Solution: Create a purchase invoice for the installation and delivery fees. Add the fixed asset number of the machine to the invoice lines and post the invoice.<br><br>Does the solution meet the goal?",
   "es": "<b>Nota: esta pregunta forma parte de una serie con el mismo escenario. Cada pregunta propone una solución distinta que podría cumplir el objetivo. Algunas series tienen más de una solución correcta y otras ninguna.</b><br><br>Una empresa compró una máquina con un pedido de compra y recibe de otro proveedor una factura aparte por instalación y transporte. Estos costes deben sumarse a la máquina para capitalizar el coste total de adquisición y amortizarlo.<br><br>Solución: crear una factura de compra por la instalación y el transporte, poner en las líneas el número de activo fijo de la máquina y registrarla.<br><br>¿La solución cumple el objetivo?",
   "src": "Topic 2 · Q80",
   "options": [
    {
     "id": "A",
     "en": "Yes",
     "es": "Sí"
    },
    {
     "id": "B",
     "en": "No",
     "es": "No"
    }
   ]
  },
  {
   "id": "lp5q8",
   "type": "drag",
   "en": "You are implementing Business Central for a company.<br><br>The finance manager of the company must configure the system to post payments and expenses. The configuration must include the following capabilities:<ul><li>Get suggested payments to the external parties based on due dates and available funds.</li><li>Apply customer payments to multiple invoices.</li><li>Submit electronic payments to the bank.</li><li>Reimburse an employee to a dedicated bank account.</li></ul>You need to recommend the page the company should use for each requirement.<br><br>Which page should you recommend posting to for each requirement? To answer, move the appropriate pages to the correct requirements. You may use each page once, more than once, or not at all.<br><br>NOTE: Each correct selection is worth one point.",
   "es": "El responsable financiero debe configurar el registro de pagos y gastos con estas capacidades:<ul><li>Obtener propuestas de pago a terceros según vencimientos y fondos disponibles.</li><li>Aplicar cobros de clientes a varias facturas.</li><li>Enviar pagos electrónicos al banco.</li><li>Reembolsar a un empleado en una cuenta bancaria específica.</li></ul>¿En qué página se registra cada requisito? Cada página puede usarse una vez, varias o ninguna.",
   "src": "Topic 2 · Q56",
   "valuesTitle": "Pages",
   "targetHeader": [
    "Requirement",
    "Page"
   ],
   "values": [
    {
     "id": "V1",
     "en": "Sales Journal",
     "es": "Sales Journal (diario de ventas)"
    },
    {
     "id": "V2",
     "en": "Payment Journal",
     "es": "Payment Journal (diario de pagos)"
    },
    {
     "id": "V3",
     "en": "Purchase Journal",
     "es": "Purchase Journal (diario de compras)"
    },
    {
     "id": "V4",
     "en": "Cash Receipt Journal",
     "es": "Cash Receipt Journal (diario de cobros)"
    }
   ],
   "targets": [
    {
     "en": "Suggested payments to external parties",
     "es": "Propuestas de pago a terceros"
    },
    {
     "en": "Customer payments for multiple invoices",
     "es": "Cobros de clientes para varias facturas"
    },
    {
     "en": "Electronic payments to bank",
     "es": "Pagos electrónicos al banco"
    },
    {
     "en": "Dedicated bank account for employee reimbursement",
     "es": "Reembolso a empleado en cuenta bancaria específica"
    }
   ]
  },
  {
   "id": "lp5q9",
   "type": "build",
   "en": "A company uses Business Central.<br><br>Accountants must upload customer data in Business Central in bulk by using Microsoft Excel.<br><br>You need to recommend how to maintain the list in Microsoft Excel, and display and edit it there.<br><br>Which four actions should you recommend be performed in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
   "es": "Los contables deben cargar en bloque datos de clientes en Business Central con Microsoft Excel, y mantener, ver y editar la lista en Excel.<br><br>¿Qué cuatro acciones recomiendas y en qué orden?",
   "src": "Secuencial Topic 4 · Q59",
   "slots": 4,
   "actions": [
    {
     "id": "A",
     "en": "Make changes to the customer records in Excel.",
     "es": "Hacer los cambios en los clientes en Excel."
    },
    {
     "id": "B",
     "en": "Download the Excel workbook to your device.",
     "es": "Descargar el libro de Excel al dispositivo."
    },
    {
     "id": "C",
     "en": "Sign in to the Business Central add-in in Excel.",
     "es": "Iniciar sesión en el add-in de Business Central en Excel."
    },
    {
     "id": "D",
     "en": "Export the customer records by using the Open in Excel action.",
     "es": "Exportar los clientes con la acción Open in Excel."
    },
    {
     "id": "E",
     "en": "Publish the changes back to Business Central.",
     "es": "Publicar los cambios en Business Central."
    },
    {
     "id": "F",
     "en": "Export the customer records by using the Edit in Excel action.",
     "es": "Exportar los clientes con la acción Edit in Excel."
    }
   ]
  },
  {
   "id": "lp5q10",
   "type": "mr",
   "en": "A company uses Dynamics 365 Business Central.<br><br>The finance team must dispose a fixed asset.<br><br>You need to recommend the process to post the fixed asset disposal.<br><br>Which two actions should you recommend the company perform? Each correct answer presents a complete solution.<br><br>NOTE: Each correct selection is worth one point.",
   "es": "Finanzas debe dar de baja (disposal, enajenación) un activo fijo.<br><br>¿Qué dos acciones recomiendas? Cada respuesta correcta es una solución completa.",
   "src": "Topic 2 · Q65",
   "options": [
    {
     "id": "A",
     "en": "Create and post a fixed asset G/L journal.",
     "es": "Crear y registrar un fixed asset G/L journal."
    },
    {
     "id": "B",
     "en": "Select a Tax Category when posting the sales invoice",
     "es": "Seleccionar una Tax Category al registrar la factura de venta"
    },
    {
     "id": "C",
     "en": "Create and post a sales invoice.",
     "es": "Crear y registrar una factura de venta."
    },
    {
     "id": "D",
     "en": "Manually adjust the depreciation amount in the fixed asset card.",
     "es": "Ajustar a mano la amortización en la ficha del activo."
    },
    {
     "id": "E",
     "en": "Use the Reverse Transactions function to cancel the fixed asset record.",
     "es": "Usar Reverse Transactions para anular el activo."
    }
   ],
   "select": 2
  }
 ]
};
