window.EXAM_DATA = {
 "id": "lp4",
 "title": "LP4 · Process sales and purchasing in Business Central",
 "title_es": "LP4 · Procesar ventas y compras en Business Central",
 "cases": {
  "CS1": {
   "title": "Case Study: Northwind Traders",
   "en": "<p><b>Background.</b> Northwind Traders is an independent, family-owned business that distributes natural pet products in the Northwest region. The company plans to open a second warehouse to expand the region. The finance and accounting teams will remain in the original location.</p>\n<p><b>Requirements – Warehouse</b></p><ul><li>Orders will be fulfilled from two possible warehouse locations.</li><li>Product will be transferred between locations by using transfer orders.</li></ul>\n<p><b>Issues – Warehouse</b></p><ul><li>The sales department and warehouse managers must have visibility into products that are in the process of being transferred between locations.</li></ul>",
   "es": "<p><b>Contexto.</b> Northwind Traders es una empresa familiar que distribuye productos naturales para mascotas en la región noroeste. Va a abrir un segundo almacén para ampliar la región. Los equipos de finanzas y contabilidad seguirán en la ubicación original.</p>\n<p><b>Requisitos – Almacén</b></p><ul><li>Los pedidos se servirán desde dos almacenes (locations) posibles.</li><li>Los productos se transferirán entre almacenes mediante transfer orders (pedidos de transferencia).</li></ul>\n<p><b>Problemas – Almacén</b></p><ul><li>El departamento de ventas y los responsables de almacén deben poder ver los productos que se están transfiriendo entre almacenes.</li></ul>"
  }
 },
 "questions": [
  {
   "id": "lp4q1",
   "type": "mr",
   "en": "A user reports that they cannot create or view sales quotes in Dynamics 365 Business Central.<br><br>You need to help the user create and view sales quotes.<br><br>From which three cards can the user perform the required activities? Each correct answer presents a complete solution.<br><br>NOTE: Each correct selection is worth one point.",
   "es": "Un usuario no consigue crear ni ver sales quotes (ofertas de venta).<br><br>¿Desde qué tres fichas puede hacerlo?",
   "src": "Topic 4 · Q10",
   "options": [
    {
     "id": "A",
     "en": "Service Item",
     "es": "Service Item"
    },
    {
     "id": "B",
     "en": "Opportunity",
     "es": "Opportunity (oportunidad)"
    },
    {
     "id": "C",
     "en": "Job",
     "es": "Job (proyecto)"
    },
    {
     "id": "D",
     "en": "Resource",
     "es": "Resource (recurso)"
    },
    {
     "id": "E",
     "en": "Customer",
     "es": "Customer (cliente)"
    },
    {
     "id": "F",
     "en": "Contact",
     "es": "Contact (contacto)"
    }
   ],
   "select": 3
  },
  {
   "id": "lp4q2",
   "type": "mr",
   "en": "You need to configure Dynamics 365 Business Central to allow for receipt of quantities of items greater than the quantity ordered.<br><br>What are two possible ways to achieve the goal? Each correct answer presents a complete solution.<br><br>NOTE: Each correct selection is worth one point.",
   "es": "Debes permitir que se reciban cantidades mayores que las pedidas.<br><br>¿Cuáles son dos formas posibles de conseguirlo? Cada respuesta correcta es una solución completa.",
   "src": "Topic 4 · Q6",
   "options": [
    {
     "id": "A",
     "en": "Configure a maximum order quantity for the item",
     "es": "Configurar una cantidad máxima de pedido en el producto"
    },
    {
     "id": "B",
     "en": "Configure a maximum inventory level for the item",
     "es": "Configurar un nivel máximo de inventario en el producto"
    },
    {
     "id": "C",
     "en": "Set up and select an over-receipt code in the item record",
     "es": "Crear un over-receipt code y asignarlo en el producto"
    },
    {
     "id": "D",
     "en": "Set up and select an over-receipt code in the vendor record",
     "es": "Crear un over-receipt code y asignarlo en el proveedor"
    }
   ],
   "select": 2
  },
  {
   "id": "lp4q3",
   "type": "yn",
   "en": "<b>Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.</b><br><br>You are implementing Dynamics 365 Business Central for a company. The company provides subscription services to their customers. The subscription invoices are almost identical each month.<br><br>The company wants to set up recurring sales lines for subscription invoices.<br><br>You need to create systems for creating subscription invoices.<br><br>Solution: Create a new recurring sales line. Open the relevant customers and attach the Recurring Sales Lines code to the customer. Then, run the Create Recurring Sales Invoices batch to create the invoices.<br><br>Does the solution meet the goal?",
   "es": "<b>Nota: esta pregunta forma parte de una serie con el mismo escenario. Cada pregunta propone una solución distinta que podría cumplir el objetivo. Algunas series tienen más de una solución correcta y otras ninguna.</b><br><br>Una empresa presta servicios de suscripción y sus facturas son casi idénticas cada mes. Quiere configurar líneas de venta periódicas (recurring sales lines) para estas facturas.<br><br>Solución: crear un código de recurring sales lines, asignarlo a los clientes correspondientes y ejecutar el proceso Create Recurring Sales Invoices.<br><br>¿La solución cumple el objetivo?",
   "src": "Topic 4 · Q15",
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
   "id": "lp4q4",
   "type": "mr",
   "en": "You are implementing Dynamics 365 Business Central for a company.<br><br>The company often invoices multiple shipments on one invoice.<br><br>You need to train the accounting staff how to process these sales invoices.<br><br>In which two ways should you train the staff to create invoices? Each correct answer presents a complete solution.<br><br>NOTE: Each correct selection is worth one point.",
   "es": "La empresa factura a menudo varios envíos en una sola factura.<br><br>¿De qué dos formas debes enseñar a contabilidad a crear estas facturas?",
   "src": "Topic 4 · Q33",
   "options": [
    {
     "id": "A",
     "en": "Use the Combine Shipments batch job to automatically create and post sales invoices and credit memos.",
     "es": "Usar el proceso Combine Shipments para crear y registrar automáticamente facturas y abonos."
    },
    {
     "id": "B",
     "en": "Create a new invoice for the Bill-to-Customer. Use the Get Shipment Lines action to select all the shipments from different sales orders and Sell-to-Customers.",
     "es": "Crear una factura para el Bill-to Customer y usar Get Shipment Lines para seleccionar envíos de distintos pedidos y distintos Sell-to Customers."
    },
    {
     "id": "C",
     "en": "Use the Combine Shipments batch job to automatically create sales invoices and delete completed sales orders.",
     "es": "Usar Combine Shipments para crear facturas y borrar los pedidos completados."
    },
    {
     "id": "D",
     "en": "Create a new invoice for the Sell-to Customer. Use the Get Shipment Lines action to select all the shipments from different sales orders, in the same currency.",
     "es": "Crear una factura para el Sell-to Customer y usar Get Shipment Lines para seleccionar envíos de distintos pedidos en la misma divisa."
    },
    {
     "id": "E",
     "en": "Use the Combine Shipments batch job to automatically create, post, and print sales invoices.",
     "es": "Usar Combine Shipments para crear, registrar e imprimir automáticamente las facturas."
    }
   ],
   "select": 2
  },
  {
   "id": "lp4q5",
   "type": "mc",
   "en": "A company uses Business Central.<br><br>The company made a mistake on a posted sales invoice and must correct it.<br><br>You need to validate whether you can correct the posted sales invoice or need to create a new corrective credit memo.<br><br>Which validation action should you do?",
   "es": "La empresa cometió un error en una factura de venta registrada y debe corregirlo.<br><br>Debes comprobar si puedes corregir la factura registrada o si necesitas crear un abono correctivo. ¿Qué debes comprobar?",
   "src": "Topic 3 · Q65",
   "options": [
    {
     "id": "A",
     "en": "Payment",
     "es": "Payment (pago)"
    },
    {
     "id": "B",
     "en": "Shipment",
     "es": "Shipment (envío)"
    },
    {
     "id": "C",
     "en": "Prepayment",
     "es": "Prepayment (prepago)"
    }
   ]
  },
  {
   "id": "lp4q6",
   "type": "drag",
   "en": "You are implementing Business Central for a company.<br><br>The finance manager requires the following implementation to determine which customers are required to make a full or partial payment before items are shipped:<ul><li>Enable the same number series for prepayments as the one used for sales invoicing.</li><li>Establish default values for a required prepayment percentage for specific items and customers.</li><li>Automatically post prepayments to a designated G/L account.</li></ul>You need to recommend the component to use for each implementation requirement.<br><br>Which component should you use? To answer, move the appropriate components to the correct requirements. You may use each component once, more than once, or not at all.<br><br>NOTE: Each correct selection is worth one point.",
   "es": "El responsable financiero quiere determinar qué clientes deben pagar total o parcialmente antes del envío (prepayments, prepagos):<ul><li>Usar para los prepagos la misma serie numérica que para las facturas de venta.</li><li>Definir porcentajes de prepago por defecto para clientes y productos concretos.</li><li>Registrar automáticamente los prepagos en una cuenta contable designada.</li></ul>¿Qué componente corresponde a cada requisito? Cada uno puede usarse una vez, varias o ninguna.",
   "src": "Topic 3 · Q63",
   "valuesTitle": "Components",
   "targetHeader": [
    "Action",
    "Component"
   ],
   "values": [
    {
     "id": "V1",
     "en": "Customer Card",
     "es": "Customer Card"
    },
    {
     "id": "V2",
     "en": "General Posting Setup",
     "es": "General Posting Setup"
    },
    {
     "id": "V3",
     "en": "General Ledger Setup",
     "es": "General Ledger Setup"
    },
    {
     "id": "V4",
     "en": "Sales & Receivables Setup",
     "es": "Sales & Receivables Setup"
    }
   ],
   "targets": [
    {
     "en": "Same number series for prepayments as for sales invoicing",
     "es": "Misma serie numérica para prepagos que para facturas de venta"
    },
    {
     "en": "Default prepayment percentage values for specific items and customers",
     "es": "Porcentajes de prepago por defecto para productos y clientes concretos"
    },
    {
     "en": "Automatic posting prepayments to designated G/L account",
     "es": "Registro automático de prepagos en una cuenta contable designada"
    }
   ]
  },
  {
   "id": "lp4q7",
   "type": "drag",
   "en": "A company uses Dynamics 365 Business Central.<br><br>Users in the purchasing and accounts payable departments require the following information about vendors and vendor ledger entries:<ul><li>Balance (LCY) for vendor</li><li>Remaining amount for ledger entry</li><li>Amount for application entry</li></ul>You need to retrieve the vendor and vendor ledger entry information.<br><br>Where should you navigate to find the information? To answer, drag the appropriate locations to the correct requirements. Each location may be used once, more than once, or not at all.<br><br>NOTE: Each correct selection is worth one point.",
   "es": "Compras y cuentas a pagar necesitan esta información de proveedores y movimientos de proveedor:<ul><li>Saldo (DL) del proveedor</li><li>Importe pendiente de un movimiento</li><li>Importe de una aplicación (liquidación)</li></ul>¿Dónde debes buscar cada dato? Cada ubicación puede usarse una vez, varias o ninguna.",
   "src": "Topic 3 · Q30",
   "valuesTitle": "Locations",
   "targetHeader": [
    "Requirement",
    "Location"
   ],
   "values": [
    {
     "id": "V1",
     "en": "Vendor card",
     "es": "Vendor card (ficha de proveedor)"
    },
    {
     "id": "V2",
     "en": "Vendor ledger entries",
     "es": "Vendor ledger entries (movimientos de proveedor)"
    },
    {
     "id": "V3",
     "en": "Detailed vendor ledger entries",
     "es": "Detailed vendor ledger entries (movimientos detallados de proveedor)"
    }
   ],
   "targets": [
    {
     "en": "Balance (LCY) for vendor",
     "es": "Saldo (DL) del proveedor"
    },
    {
     "en": "Remaining amount for ledger entry",
     "es": "Importe pendiente de un movimiento"
    },
    {
     "en": "Amount for application entry",
     "es": "Importe de una aplicación"
    }
   ]
  },
  {
   "id": "lp4q8",
   "type": "build",
   "en": "You are creating a filtered view of a Chart of Accounts page.<br><br>The page must be filtered to display Net Change values only for transactions between a specific date range. You must save the filtered view for future use.<br><br>You need to filter on transactions occurring between January 1, 2020 and January 31, 2020.<br><br>Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.",
   "es": "Creas una vista filtrada del Chart of Accounts que muestre Net Change (saldo del periodo) solo para un rango de fechas y quieres guardarla.<br><br>Debes filtrar las transacciones entre el 1 y el 31 de enero de 2020. ¿Qué tres acciones debes realizar y en qué orden?",
   "src": "Secuencial Topic 4 · Q21",
   "slots": 3,
   "actions": [
    {
     "id": "A",
     "en": "Set the date range to <b>01/01/20|01/31/20</b> and save the view.",
     "es": "Poner el rango <b>01/01/20|01/31/20</b> y guardar la vista."
    },
    {
     "id": "B",
     "en": "Select <b>Date Filter</b>.",
     "es": "Seleccionar <b>Date Filter</b>."
    },
    {
     "id": "C",
     "en": "Add a <b>Filter totals by</b> filter.",
     "es": "Añadir un filtro en <b>Filter totals by</b>."
    },
    {
     "id": "D",
     "en": "Select <b>Net Change</b>.",
     "es": "Seleccionar <b>Net Change</b>."
    },
    {
     "id": "E",
     "en": "Set the date range to <b>01/01/20..01/31/20</b> and save the view.",
     "es": "Poner el rango <b>01/01/20..01/31/20</b> y guardar la vista."
    },
    {
     "id": "F",
     "en": "Add a <b>Filter list by</b> filter.",
     "es": "Añadir un filtro en <b>Filter list by</b>."
    }
   ]
  },
  {
   "id": "lp4q9",
   "type": "build",
   "en": "You are setting up a new company for a customer.<br><br>The customer wants to understand the structure of the elements involved in inventory posting.<br><br>You need to describe the relationship between elements in a basic inventory setup.<br><br>What is the hierarchical order of the elements included in inventory posting beginning with the master data? To answer, move the appropriate three entities from the list of actions to the answer area and arrange them in the correct order.",
   "es": "El cliente quiere entender la estructura de los elementos que intervienen en el registro de inventario.<br><br>¿Cuál es el orden jerárquico, empezando por los datos maestros? Mueve las tres entidades adecuadas y ordénalas.",
   "src": "Secuencial Topic 3 · Q15",
   "slots": 3,
   "actions": [
    {
     "id": "A",
     "en": "Stockkeeping Units",
     "es": "Stockkeeping Units"
    },
    {
     "id": "B",
     "en": "Value Entries",
     "es": "Value Entries (movimientos de valor)"
    },
    {
     "id": "C",
     "en": "Item Ledger Entries",
     "es": "Item Ledger Entries (movimientos de producto)"
    },
    {
     "id": "D",
     "en": "Warehouse Entries",
     "es": "Warehouse Entries (movimientos de almacén)"
    },
    {
     "id": "E",
     "en": "Items",
     "es": "Items (productos)"
    }
   ]
  },
  {
   "id": "lp4q10",
   "type": "mc",
   "en": "You need to configure a third location to allow transfer orders to be posted between the two warehouses.<br><br>What should you configure?",
   "es": "Debes configurar una tercera location para poder registrar transfer orders entre los dos almacenes.<br><br>¿Qué debes configurar?",
   "src": "Case Study 1 · Topic 4 · Q44",
   "case": "CS1",
   "options": [
    {
     "id": "A",
     "en": "Default Dimensions",
     "es": "Default Dimensions"
    },
    {
     "id": "B",
     "en": "Use as In-Transit",
     "es": "Use As In-Transit"
    },
    {
     "id": "C",
     "en": "Cross-Dock Bin Code",
     "es": "Cross-Dock Bin Code"
    },
    {
     "id": "D",
     "en": "Bins",
     "es": "Bins (ubicaciones)"
    }
   ]
  }
 ]
};
